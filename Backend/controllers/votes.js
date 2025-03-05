import prisma from "../config/db.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const addVote = asyncHandler(async (req, res, next) => {
  const { pollId, userId, optionId } = req.body;

  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
  });
  if (!poll) {
    return next(new ErrorResponse("Poll doesn't exist", 401));
  }
  const pollOption = await prisma.pollOption.findUnique({
    where: { id: optionId },
  });
  if (!pollOption) {
    return next(new ErrorResponse("Poll option doesn't exist", 401));
  }
  const existingVote = await prisma.pollVote.findUnique({
    where: {
      userId_pollId: {
        userId,
        pollId,
      },
    },
  });
  if (existingVote) {
    return next(new ErrorResponse("User has already voted in this poll", 400));
  }

  const vote = await prisma.pollVote.create({
    data: {
      optionId,
      pollId,
      userId,
    },
  });
  res.status(201).json({
    message: "Vote added successfully",
    data: vote,
  });
});

export const changeVote = asyncHandler(async (req, res, next) => {
  const { pollId, userId, optionId } = req.body;

  const vote = await prisma.pollVote.findUnique({
    where: {
      userId_pollId: {
        userId,
        pollId,
      },
    },
  });
  if (!vote) {
    return next(new ErrorResponse("Vote doesn't exist", 401));
  }

  const pollOption = await prisma.pollOption.findUnique({
    where: { id: optionId },
  });
  if (!pollOption) {
    return next(new ErrorResponse("Poll option doesn't exist", 401));
  }

  const updatedVote = await prisma.pollVote.update({
    where: {
      userId_pollId: {
        userId,
        pollId,
      },
    },
    data: {
      optionId,
    },
  });
  res.status(201).json({
    message: "Vote updated successfully",
    data: updatedVote,
  });
});
export const getUserVotes = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const votes = await prisma.pollVote.findMany({
    where: { userId },
    include: {
      poll: {
        include: {
          _count: {
            select: { votes: true },
          },
        },
      },
    },
  });

  const formattedVotes = votes.map((vote) => ({
    ...vote,
    totalVotes: vote.poll._count.votes,
  }));

  res.status(200).json({
    message: 'User votes fetched successfully',
    data: formattedVotes,
  });
});
export const allVotes = asyncHandler(async (req, res, next) => {
  const polls = await prisma.poll.findMany({
    include: {
      options: true,
      _count: {
        select: { votes: true },
      },
    },
  });

  if (!polls || !Array.isArray(polls)) {
    return res.status(404).json({ success: false, error: 'No polls found' });
  }

  res.status(201).json({
    message: "Polls fetched successfully",
    data: polls.map(poll => ({
      id: poll.id,
      question: poll.question,
      description: poll.description,
      options: poll.options,
      expiresAt: poll.expiresAt,
      createdAt: poll.createdAt,
      status: poll.status,
      totalVotes: poll._count.votes,
    })),
  });
});

export const deleteVote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const vote = await prisma.pollVote.findUnique({
    where: { id },
  });
  if (!vote) {
    return next(new ErrorResponse("Vote doesn't exist", 401));
  }
  await prisma.pollVote.delete({
    where: { id },
  });
  res.status(200).json({
    message: "Vote deleted successfully",
  });
});
