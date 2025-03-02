BEGIN TRY

BEGIN TRAN;

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

-- AddForeignKey
ALTER TABLE [dbo].[IncidentReport] ADD CONSTRAINT [IncidentReport_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IncidentMedia] ADD CONSTRAINT [IncidentMedia_incidentId_fkey] FOREIGN KEY ([incidentId]) REFERENCES [dbo].[IncidentReport]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
