module.exports = {
    CON_TIPO_CREDITO: "Select trim(gbcon.gbconabre) item_id, trim(gbcon.gbcondesc) item_text From gbcon Where  gbcon.gbconpfij = 80 and gbcon.gbconcorr in(3,4,17,19)   order by gbcon.gbconabre desc",
    CON_OFICINAS: "select trim(gbofinofi || '') as item_id, trim(gbofidesc)  as item_text from gbofi where gbofinofi in (3,4,6,9,12,15,5,11,14,18,8,16,20,23,19,26,28)",
    CON_ESTADO_CREDITO: "select trim(idpconcorr || '') as item_id, idpcondesc as item_text  from idpcon where idpconpref = 10 and idpconcorr != 0 and idpconcorr in(1,2,5) order by idpconcorr asc",
    CON_GENERO: "select trim(gbconcorr || '') item_id, trim(gbcondesc) item_text from gbcon where  gbconpfij =2 and gbconcorr != 0",
    CON_TIPO_MOTIVO_RECHAZO: "select trim(idpconcorr || '') as item_id, idpcondesc as item_text  from idpcon where idpconpref = 9 and idpconcorr != 0 order by idpconcorr asc"

}
