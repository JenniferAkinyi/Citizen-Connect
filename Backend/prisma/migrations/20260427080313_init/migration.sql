BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [Users_role_df] DEFAULT 'user',
    [resetToken] NVARCHAR(1000),
    [resetTokenExpiry] DATETIME2,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[IncidentReport] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [IncidentReport_status_df] DEFAULT 'pending',
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [IncidentReport_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [category] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [IncidentReport_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IncidentMedia] (
    [id] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [incidentId] NVARCHAR(1000) NOT NULL,
    [uploadedAt] DATETIME2 NOT NULL CONSTRAINT [IncidentMedia_uploadedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [IncidentMedia_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[polls] (
    [id] NVARCHAR(1000) NOT NULL,
    [question] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [polls_status_df] DEFAULT 'unverified',
    [createdBy] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [polls_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [expiresAt] DATETIME2,
    CONSTRAINT [polls_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PollOption] (
    [id] NVARCHAR(1000) NOT NULL,
    [text] NVARCHAR(1000) NOT NULL,
    [pollId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PollOption_pkey] PRIMARY KEY CLUSTERED ([id])
);

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
ALTER TABLE [dbo].[IncidentMedia] ADD CONSTRAINT [IncidentMedia_incidentId_fkey] FOREIGN KEY ([incidentId]) REFERENCES [dbo].[IncidentReport]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[polls] ADD CONSTRAINT [polls_createdBy_fkey] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PollOption] ADD CONSTRAINT [PollOption_pollId_fkey] FOREIGN KEY ([pollId]) REFERENCES [dbo].[polls]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PollVote] ADD CONSTRAINT [PollVote_optionId_fkey] FOREIGN KEY ([optionId]) REFERENCES [dbo].[PollOption]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PollVote] ADD CONSTRAINT [PollVote_pollId_fkey] FOREIGN KEY ([pollId]) REFERENCES [dbo].[polls]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PollVote] ADD CONSTRAINT [PollVote_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
