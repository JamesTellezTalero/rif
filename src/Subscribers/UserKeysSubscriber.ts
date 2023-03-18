import { EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { UserKeys } from "../entities/UserKeys";

@EventSubscriber()
export class UserKeysSubscriber {
    listenTo(){
        return UserKeys;
    }

    async beforeInsert(event:InsertEvent<UserKeys>){
        event.entity.createAt = new Date();
    }

    async beforeUpdate(event:UpdateEvent<UserKeys>){
        event.entity.updateAt = new Date();
    }
}