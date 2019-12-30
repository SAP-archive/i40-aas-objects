interface IAdministrativeInformation {
    version?: string;
    revision?: string;
}

class AdministrativeInformation implements IAdministrativeInformation {
    version?: string;
    revision?: string;
    constructor(obj: IAdministrativeInformation) {
        if (obj.version) this.version = obj.version;
        if (obj.revision) this.revision = obj.revision;
    }
}

export { AdministrativeInformation, IAdministrativeInformation };
