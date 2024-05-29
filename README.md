# Getting Started

very simple CDS application  with  implemented opentelemetry for SAP 
[docs here] (https://support.sap.com/en/alm/sap-cloud-alm/operations/expert-portal/data-collection-infrastructure.html?anchorId=section_1126281377)


It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide

## Start local execution
- Clone repository
- npm install 
- cds build
- cds watch

## Deploy
- npx -p @sap/cds-dk cds build --production
- mbt build -t gen --mtar mta.tar 
- cf login
- cf deploy gen/mta.tar

