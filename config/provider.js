const PRODUCCION = "https://gestion.idepro.org/";

module.exports = {
    ENDPOINT_CREAR_CREDITO_RECHAZADO: PRODUCCION + "MOD-CONTABILIDAD/ModContabilidad/AsientosFideicomisosAutomatico/saveCreditoRechazado",
   // ENDPOINT_LISTA_CONCEPTOS: PRODUCCION + "MOD-CONTABILIDAD/ModContabilidad/AsientosFideicomisosAutomatico/concepto",
    ENDPOINT_LISTA_CONCEPTOS:  'http://10.0.1.81:6000/api/consulta',
    ENDPOINT_LISTA_CONCEPTOS_PREFIJO: PRODUCCION + "MOD-CONTABILIDAD/ModContabilidad/AsientosFideicomisosAutomatico/conceptoPrefijo",
    ENDPOINT_LISTA_OFICINA: PRODUCCION + "MOD-CONTABILIDAD/ModContabilidad/AsientosFideicomisosAutomatico/conceptoOficina",
    ENDPOINT_LISTA_TIPO_PERSONA: PRODUCCION + "MOD-CONTABILIDAD/ModContabilidad/AsientosFideicomisosAutomatico/conceptoAgenda",
    ENDPOINT_LISTA_CREDITO_RECHAZADO: PRODUCCION + "MOD-CONTABILIDAD/ModContabilidad/AsientosFideicomisosAutomatico/listCreditoRechazado",

}