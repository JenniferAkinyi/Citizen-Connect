import prisma from "../config/db.js"; 
import asyncHandler  from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const reportIncident = asyncHandler(async (req, res, next) => {
    const { title, description, location, status, category, media, userId } = req.body;
    const incident = await prisma.incidentReport.create({
        data: {
            title,
            description,
            location,
            status,
            category,
            userId,
            media: {
                create: media.map((m) => ({
                    url: m.url,
                    type: m.type,
                })),
            }
        }
    })
    res.status(201).json({
        message: "Incident reported successfully",
        data: incident
    })
})
export const allIncidents = asyncHandler(async(req, res, next)=>{
    const incidents = await prisma.incidentReport.findMany({
        include: {
            media: true
        }
    })

    if(incidents.length === 0){
        return next(new ErrorResponse("No incidents available", 401))
    }
    res.status(201).json({
        message: "Incidents fetched successfully",
        data: incidents
    })
})
export const fetchById = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const incident = await prisma.incidentReport.findUnique({
        where: { id: id},
        include: {
            media: true
        }
    })
    if(!incident){
        return next(new ErrorResponse("Incident doesn't exist", 401))
    }
    res.status(201).json({
        message: "Incident fetched successfully",
        data: incident
    })
})
export const updateIncident = asyncHandler(async(req, res, next) => {
    const { id } = req.params
    const { title, description, location, status, category, media } = req.body;
    let incident = await prisma.incidentReport.findUnique({
        where: { id: id },
        include: {
            media: true
        }
    })
    if(!incident){
        return next(new ErrorResponse("Incident doesn't exist", 401))
    }
    const mediaUpdates = media.filter(m => m.id).map(m => ({
        where: { id: m.id },
        data: {
            url: m.url,
            type: m.type
        }
    }));

    const mediaCreations = media.filter(m => !m.id).map(m => ({
        url: m.url,
        type: m.type
    }));

    incident = await prisma.incidentReport.update({
        where: { id: id },
        data: {
            title,
            description,
            location,
            status,
            category,
            media: {
                update: mediaUpdates,
                create: mediaCreations
            }
        },
        include: {
            media: true
        }
    })
    res.status(201).json({
        message: "Incident updated successfully",
        data: incident
    })
})
export const deleteIncident = asyncHandler(async(req, res, next) => {
    const { id } = req.params
    const incident = await prisma.incidentReport.findUnique({
        where: { id: id}
    })
    if(!incident){
        return next(new ErrorResponse("Incident doesn't exist", 401))
    }
    await prisma.incidentReport.delete({
        where: { id: id }
    })
    res.status(201).json({
        message: "Incident deleted successfully",
        data: incident
    })
})