import {ToSolicitudRepository} from "./ToSolicitud";

ToSolicitudRepository.rawCollection().createIndex({'IdSolicitud':-1})
ToSolicitudRepository.rawCollection().createIndex({'FechaSolicitud':-1});
