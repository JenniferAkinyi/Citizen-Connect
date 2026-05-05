import prisma from "../config/db.js";
import { text } from "express";

export async function createPollService(
  question,
  description,
  options,
  status,
  createdBy,
  expiresAt,
) {
  try {
    const poll = await prisma.poll.create({
      data: {
        question,
        description,
        status,
        creator: {
          connect: {
            id: createdBy,
          },
        },
        expiresAt,
        options: {
          create: options.map((option) => ({
            text: option.text,
          })),
        },
      },
      include: {
        options: true,
      },
    });
    return {
      id: poll.id,
      question: poll.question,
      description: poll.description,
      status: poll.status,
      createdBy: poll.createdBy,
      expiresAt: poll.expiresAt,
      options: poll.options,
    };
  } catch (error) {
    console.error("Prisma Error", error);
    throw new Error(error.message);
  }
}
export async function fetchPollsService() {
  const polls = await prisma.poll.findMany({
    include: {
      options: true,
    },
  });
  return polls;
}
export async function fetchPollByIdService(id) {
  const poll = await prisma.poll.findUnique({
    where: { id },
    include: {
      options: true,
    },
  });
  if (!poll) {
    throw new Error("Poll not found");
  }
  return poll;
}
export async function editPollService(
  id,
  question,
  description,
  options,
  status,
  createdBy,
  expiresAt,
) {
  const existingPoll = await prisma.poll.findUnique({
    where: { id },
  });
  if (!existingPoll) {
    throw new Error("Poll not found");
  }
  const editedPoll = await prisma.poll.update({
    where: { id },
    data: {
      question,
      description,
      status,
      expiresAt,
      options: {
        deleteMany: {},
        create: options.map((option) => ({
          text: option.text,
        })),
      },
    },
    include: {
      options: true,
    },
  });
  return {
    question: editedPoll.question,
    description: editedPoll.description,
    status: editedPoll.status,
    expiresAt: editedPoll.expiresAt,
    options: editedPoll.options,
  };
}
export async function deletePollService(id) {
  const existingPoll = await prisma.poll.findUnique({
    where: { id },
  });
  if (!existingPoll) {
    throw new Error("Poll not found");
  }
  const poll = await prisma.poll.delete({
    where: { id }
  })
  return {message: "Poll deleted successfully"}
}
