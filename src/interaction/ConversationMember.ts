import { IIdentifier } from '../baseClasses/Identifier';

interface IConversationMember {
    identification?: IIdentifier;
    role: Role;
}

interface IRole {
    name: string;
}

class ConversationMember implements IConversationMember {
    identification?: IIdentifier;
    role: Role;

    constructor(obj: IConversationMember) {
        if (obj.identification) this.identification = obj.identification;
        this.role = obj.role;
    }

    getRole(): Role {
        return this.role;
    }

    getIdentification(): IIdentifier | undefined {
        return this.identification;
    }
}

class Role implements IRole {
    name: string;

    constructor(obj: IRole) {
        this.name = obj.name;
    }
}

export { ConversationMember, Role, IConversationMember };
