import prisma from "../config/db.js";

export async function reportIncidentService(
  title,
  description,
  location,
  status,
  category,
  media,
  userId,
) {
  try {
    const incident = await prisma.incidentReport.create({
      data: {
        title,
        description,
        location,
        status,
        category,
        user: {
          connect: {
            id: userId,
          },
        },
        media: {
          create: media.map((m) => ({
            url: m.url,
            type: m.type,
          })),
        },
      },
      include: {
        media: true,
      },
    });

    return {
      id: incident.id,
      title: incident.title,
      description: incident.description,
      location: incident.location,
      status: incident.status,
      category: incident.category,
      media: incident.media,
    };
  } catch (error) {
    console.error("Prisma error:", error);
    throw new Error(error.message);
  }
}
export async function getIncidentsService() {
  const incidents = await prisma.incidentReport.findMany({
    include: {
      media: {
        select: {
          url: true,
          type: true,
        },
      },
    },
  });
  return incidents;
}
export async function getIncidentByIdService(id) {
  const incident = await prisma.incidentReport.findUnique({
    where: { id },
    include: {
      media: true,
    },
  });
  if (!incident) {
    throw new Error("Incident not found");
  }
  return incident;
}
export async function editIncidentService(
  id,
  title,
  description,
  location,
  status,
  category,
  media,
) {
  const existingIncident = await prisma.incidentReport.findUnique({
    where: { id },
  });
  if (!existingIncident) {
    throw new Error("Incident not found");
  }
  const editedIncident = await prisma.incidentReport.update({
    where: { id },
    data: {
      title,
      description,
      location,
      status,
      category,
      media: {
        deleteMany: {},
        create: media.map((m) => ({
          url: m.url,
          type: m.type,
        })),
      },
    },
    include: {
      media: true,
    },
  });
  return {
    title: editedIncident.title,
    description: editedIncident.description,
    location: editedIncident.location,
    status: editedIncident.status,
    category: editedIncident.category,
    media: editedIncident.media,
  };
}
export async function deleteIncidentService(id){
  const existingIncident = await prisma.incidentReport.findUnique({
    where: {id},

  })
  if(!existingIncident){
    throw new Error("Incident not found")
  }
  const incident = await prisma.incidentReport.delete({
    where: { id }
  })
  return{ message: "Incident deleted successfully"}
}
