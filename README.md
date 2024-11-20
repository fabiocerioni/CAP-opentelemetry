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

# Proyecto para Integración con Real User Monitoring

Este proyecto está diseñado para integrarse con el **Real User Monitoring (RUM)** de SAP. A continuación, se detalla la configuración necesaria:

## Archivos de Configuración

### Archivo `.npmrc`
El archivo `.npmrc` contiene las credenciales necesarias para acceder al repositorio de SAP en formato Base64. Estas credenciales se encuentran en ``https://ui.repositories.cloud.sap/www/webapp/users``. Este archivo es crucial para descargar las siguientes bibliotecas específicas:

- **`@sap/fesr-to-otel-js`**  
  Ubicación:  
  `https://73555000100200018064.npmsrv.cdn.repositories.cloud.sap/@sap/fesr-to-otel-js/-/fesr-to-otel-js-1.5.6.tgz`

- **`@sap/xotel-agent-ext-js`**  
  Ubicación:  
  `https://73555000100200018064.npmsrv.cdn.repositories.cloud.sap/@sap/xotel-agent-ext-js/-/xotel-agent-ext-js-1.5.13.tgz`

Estas bibliotecas son esenciales para habilitar la captura de datos desde el frontend hacia el sistema de monitoreo.

## Configuración en `mta.yaml`

El archivo `mta.yaml` debe incluir las siguientes propiedades para la correcta integración del servicio:

```yaml
properties:
  SAP_CALM_FESR_LOG_LEVEL: debug
  SAP_CALM_DCI_LOG_LEVEL: debug
  SAP_CALM_SERVICE_NAME: calm-cls-incidents-f2-poc
  SAP_CALM_SERVICE_TYPE: SAP_CP_CF
  OTEL_RESOURCE_ATTRIBUTES: sap.tenancy.tenant_id=8c52b77d-9b3c-45d2-815c-aabde8e2d5ed
  NODE_ARGS: -r @sap/xotel-agent-ext-js/dist/common/tracer
```
## Detalles de las Propiedades

### `SAP_CALM_FESR_LOG_LEVEL` y `SAP_CALM_DCI_LOG_LEVEL`
Establecen el nivel de registro como `debug` para facilitar el diagnóstico.

---

### `SAP_CALM_SERVICE_NAME` y `SAP_CALM_SERVICE_TYPE`
Identifican el nombre del servicio y su tipo. En este caso:
- **`calm-cls-incidents-f2-poc`** es el nombre del servicio.
- **`SAP_CP_CF`** indica que es un servicio en SAP Cloud Platform (Cloud Foundry).

---

### `OTEL_RESOURCE_ATTRIBUTES`
Incluye el identificador del inquilino (`tenant_id`). Este valor debe ser el **subaccount configurado en Real User Monitoring**, donde se capturará la información de monitoreo.

**Ejemplo:**
```plaintext
sap.tenancy.tenant_id=8c52b77d-9b3c-45d2-815c-aabde8e2d5ed
```
## Integración en el Bootstrap de la Aplicación

En el proceso de inicialización de la aplicación, es necesario registrar el endpoint de **FESR** (Frontend Event Service Recorder). Esto se realiza añadiendo el siguiente código al bootstrap de la aplicación:

```javascript
this.on('bootstrap', async (req) => {
    fesr.registerFesrEndpoint(app);
});
