BEGIN TRY

BEGIN TRAN;

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

-- AddForeignKey
ALTER TABLE [dbo].[polls] ADD CONSTRAINT [polls_createdBy_fkey] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PollOption] ADD CONSTRAINT [PollOption_pollId_fkey] FOREIGN KEY ([pollId]) REFERENCES [dbo].[polls]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
