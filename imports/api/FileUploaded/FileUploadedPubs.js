import { UploadedFiles } from './FileUploaded';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const uploadedFilesPublication=new PublishEndpoint('uploadedFiles.list',function(groupP = ''){
        return UploadedFiles.find({group:groupP},{
                
        });
});

//uploadedFilesPublication.use(new PermissionMiddleware(Permissions.UPLOADEDFILES.LIST.VALUE));