import { initialStateType } from "./initialStateType.type"
import { actionType } from "./actionType.type"

export type contextType = {
    state: initialStateType,
    dispatch: (action: actionType) => void
}



	
	