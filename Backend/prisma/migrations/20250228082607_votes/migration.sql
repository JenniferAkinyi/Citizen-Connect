BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[IncidentReport] DROP CONSTRAINT [IncidentReport_userId_fkey];

-- CreateTable
CREATE TABLE [dbo].[PollVote] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [pollId] NVARCHAR(1000) NOT NULL,
    [optionId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PollVote_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PollVote_userId_pollId_key] UNIQUE NONCLUSTERED ([userId],[pollId])
);

-- AddForeignKey
ALTER TABLE [dbo].[IncidentReport] ADD CONSTRAINT [IncidentReport_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PollVote] ADD CONSTRAINT [PollVote_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PollVote] ADD CONSTRAINT [PollVote_pollId_fkey] FOREIGN KEY ([pollId]) REFERENCES [dbo].[polls]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PollVote] ADD CONSTRAINT [PollVote_optionId_fkey] FOREIGN KEY ([optionId]) REFERENCES [dbo].[PollOption]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
