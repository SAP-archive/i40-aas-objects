import { IFrame } from './Frame';

interface IInteractionMessage {
    frame: IFrame;
    interactionElements: Array<object>;
}

class InteractionMessage implements IInteractionMessage {
    frame: IFrame;
    interactionElements: Array<object>;

    constructor(obj: InteractionMessage) {
        this.frame = obj.frame;
        this.interactionElements = obj.interactionElements;
    }
}
export { IInteractionMessage, InteractionMessage };
