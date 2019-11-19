import { Frame, IFrame } from './Frame';
import { Submodel, ISubmodel } from '../identifiables/Submodel';

interface IInteractionMessage {
    frame: IFrame;
    interactionElements: Array<ISubmodel>;
}

class InteractionMessage implements IInteractionMessage {
    frame: IFrame;
    interactionElements: Array<ISubmodel>;

    constructor(obj: InteractionMessage) {
        this.frame = obj.frame;
        this.interactionElements = obj.interactionElements;
    }
}
export { IInteractionMessage, InteractionMessage };
