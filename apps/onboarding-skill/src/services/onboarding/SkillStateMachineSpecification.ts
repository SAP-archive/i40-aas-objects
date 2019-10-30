import { MachineOptions, EventObject, Machine, assign } from "xstate";

import { ISkillContext } from "./statemachineinterface/ISkillContext";

import { logger } from "../../log";

//TODO: if instance created and request type from manufactuer failed
//what should be the best response to the initiator?
//how does the receiver know that the requestRefused message refers to
//the type request?
//(the operator gets two responses for one request)
class SkillStateMachineSpecification {
  private readonly machineDescription = {
    id: "onboarding-central-asset-repository",
    initial: "WaitingForOnboardingRequest",
    strict: true,
    states: {
      WaitingForOnboardingRequest: {
        on: {
          PUBLISHINSTANCE_FROM_OPERATOR: [
            {
              cond: "notRequestApproval",
              target: "CreatingInstance"
            },
            {
              cond: "requestApproval",
              target: "WaitingForApproval",
              actions: ["requestApprovalFromApprover"]
            }
          ]
        }
      },
      WaitingForApproval: {
        on: {
          APPROVED_FROM_APPROVER: {
            target: "CreatingInstance"
          },
          REQUESTREFUSED_FROM_APPROVER: {
            target: "OperationFailed",
            actions: ["sendRequestRefusedToInitiator"]
          }
        }
      },
      CreatingInstance: {
        invoke: {
          id: "create-instance-promise",
          src: "createInstance",
          onDone: [
            {
              target: "InstancePublished",
              cond: "notRequestType",
              actions: "sendResponseInstanceToInitiator"
            },
            {
              target: "WaitingForType",
              cond: "requestType",
              actions: "sendResponseToInitiatorAndRequestType"
            }
          ],
          onError: {
            target: "OperationFailed",
            actions: "sendErrorBack"
          }
        }
      },
      InstancePublished: {
        type: "final"
      },
      InstanceAndTypePublished: {
        type: "final"
      },
      OperationFailed: {
        type: "final"
      },
      WaitingForType: {
        on: {
          RESPONSETYPE_FROM_MANUFACTURER: {
            target: "InstanceAndTypePublished",
            actions: ["sendResponseTypeToInitiator"]
          },
          NOTUNDERSTOOD_FROM_MANUFACTURER: {
            target: "OperationFailed",
            actions: ["sendErrorToInitiator"]
          },
          ERROR_FROM_MANUFACTURER: {
            target: "OperationFailed",
            actions: ["sendErrorToInitiator"]
          },
          REQUESTREFUSED_FROM_MANUFACTURER: {
            target: "OperationFailed",
            actions: ["sendRequestRefusedToInitiator"]
          }
        }
      }
    }
  };

  private readonly options: Partial<
    MachineOptions<ISkillContext, EventObject>
  > = {
    services: {
      createInstance: (context: any, event: any) => {
        logger.debug("service createInstance called");
        return context.actionMap.createInstance(context, event);
      }
    },
    guards: {
      notRequestType: (context: any, event: any) => {
        return !context.askForType;
      },
      requestType: (context: any, event: any) => {
        return context.askForType;
      },
      notRequestApproval: (context: any, event: any) => {
        return !context.askForApproval;
      },
      requestApproval: (context: any, event: any) => {
        return context.askForApproval;
      }
    },
    actions: {
      sendErrorBack: (context: any, event: any) =>
        context.actionMap.sendErrorBack(context, event),
      sendResponseToInitiatorAndRequestType: (context: any, event: any) =>
        context.actionMap.sendResponseToInitiatorAndRequestType(context, event),
      //only send back response
      sendResponseInstanceToInitiator: (context, event) =>
        context.actionMap.sendResponseInstanceToInitiator(context, event),
      sendRequestRefusedToInitiator: (context, event) =>
        context.actionMap.sendRequestRefusedToInitiator(context, event),

      sendErrorToInitiator: (context, event) =>
        context.actionMap.sendErrorToInitiator(context, event),

      sendResponseTypeToInitiator: (context, event) =>
        context.actionMap.sendResponseTypeToInitiator(context, event),

      requestApprovalFromApprover: (context, event) =>
        context.actionMap.requestApprovalFromApprover(context, event)
    }
  };

  getNewStateMachine() {
    return Machine(this.machineDescription, this.options);
  }
}

export { SkillStateMachineSpecification as SkillStateMachine };
