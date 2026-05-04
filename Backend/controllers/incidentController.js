import { reportIncidentService } from "../services/incidentService.js";

export async function reportIncident(req, res) {
  try {
    const { title, description, location, media, status, category } = req.body;

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
      req.users?.id 
    );
    res.status(200).json({
      message: "Incident reported successfully",
      details: incident,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}