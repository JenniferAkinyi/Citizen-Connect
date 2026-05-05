import prisma from "../config/db.js";

export async function addVoteService(userId, pollId, optionId) {
  try {
    const vote = await prisma.pollVote.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        poll: {
          connect: {
            id: pollId,
          },
        },
        option: {
          connect: {
            id: optionId,
          },
        },
      },
    });
    return {
      id: vote.id,
      userId: vote.userId,
      pollId: vote.pollId,
      optionId: vote.optionId,
    };
  } catch (error) {
    console.error("Prisma Error", error);
    throw new Error(error.message);
  }
}
export async function changeVoteService(userId, pollId, optionId) {
  const vote = await prisma.pollVote.findUnique({
    where: {
      userId_pollId: {
        userId,
        pollId,
      },
    },
  });
  if (!vote) {
    throw new Error("Vote not found");
  }
  const pollOption = await prisma.pollOption.findFirst({
    where: {
      id: optionId,
      pollId: pollId,
    },
  });
  if (!pollOption) {
    throw new Error("Poll option does not exist");
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
    include: {
        option: true
    }
  });
  return {
    optionId: updatedVote.optionId,
  };
}
export async function allVotesService(){
    const votes = await prisma.pollVote.findMany()
    return votes
}
export async function fetchVoteByIdService(id){
    const vote = await prisma.pollVote.findUnique({
        where: { id }
    })
    if(!vote){
        throw new Error("Vote not found")
    }
    return vote
}
export async function deleteVoteService(id){
    const existingVote = await prisma.pollVote.findUnique({
        where: {id}
    })
    if(!existingVote){
        throw new Error("Vote not found")
    }
    const vote = await prisma.pollVote.delete({
        where: {id}
    })
    return {message: "Vote deleted successfully"}
}