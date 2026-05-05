import { createPollService, fetchPollsService, fetchPollByIdService, editPollService, deletePollService } from "../services/pollService.js";

export async function createPoll(req, res) {
  try {
    const { question, description, options, status, expiresAt } = req.body;
    const createdBy = req.user?.id;
    if (
      !question ||
      !options ||
      !Array.isArray(options) ||
      options.length < 2
    ) {
      return res
        .status(400)
        .json({ message: "A poll must have at least 2 options" });
    }
    const poll = await createPollService(
      question,
      description,
      options,
      status,
      createdBy,
      expiresAt,
    );
    return res
      .status(200)
      .json({ message: "Poll created successfully", details: poll });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
export async function fetchPolls(req, res){
    try {
        const polls = await fetchPollsService()
        return res.status(200).json({ message: "Polls fetched successfully", details: polls})
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}
export async function fetchPollById(req, res){
    try {
        const {id} = req.params
        const poll = await fetchPollByIdService(id)
        return res.status(200).json({ message: "Poll fetched successfully", details: poll})
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}
export async function editPoll(req, res){
    try {
        const {id }= req.params
        const {question, description, options, status, expiresAt} = req.body
        const poll = await editPollService(id, question, description, options, status, expiresAt)
        return res.status(200).json({ message: "Poll edited successfully", details: poll})
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}
export async function deletePoll(req, res){
    try {
        const { id } = req.params
        const result = await deletePollService(id)
        return res.status(200).json({ result})   
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
