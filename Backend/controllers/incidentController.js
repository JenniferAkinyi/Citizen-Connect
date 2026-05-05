import { reportIncidentService, getIncidentsService, getIncidentByIdService, editIncidentService, deleteIncidentService } from "../services/incidentService.js";

export async function reportIncident(req, res) {
  try {
    const { title, description, location, media, status, category } = req.body;
    const userId = req.user?.id;
    if (!title || !description || !location || !media || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const incident = await reportIncidentService(
      title,
      description,
      location,
      status,
      category,
      media,
      userId,
    );
    res.status(200).json({
      message: "Incident reported successfully",
      details: incident,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export async function getIncidents(req, res){
    try {
        const incidents = await getIncidentsService()
        return res.status(200).json({ message: "Incidents fetched Successfully", details: incidents})
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}
export async function getIncidentById(req, res){
  try {
    const incident = await getIncidentByIdService(req.params.id)
    return res.status(200).json({ message: "Incident fetched successfully", details: incident})
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}
export async function editIncident(req, res){
  try {
    const {id} = req.params
    const { title, description, location, status, category, media} = req.body
    const incident = await editIncidentService( id, title, description, location, status, category, media)
    return res.status(200).json({ message: "Incident report edited successfully", details: incident})
  } catch (error) {
    return res.status(400).json({ message: error.message})
  }
}
export async function deleteIncident(req, res){
  try {
    const {id} = req.params
    const result = await deleteIncidentService(id)
    return res.status(200).json({ result})
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}