import { useEffect, useState } from "react";
import { DefaultModalOptions, Modal, ModalType } from "./types";
import { StyleSheet } from "react-native";

const MODAL_LIMIT = 4;

export enum ActionType {
	ADD_MODAL,
	UPDATE_MODAL,
	UPSERT_MODAL,
	DISMISS_MODAL,
	REMOVE_MODAL,
	START_PAUSE,
	END_PAUSE,
}

type Action =
	| {
			type: ActionType.ADD_MODAL;
			modal: Modal;
	  }
	| {
			type: ActionType.UPSERT_MODAL;
			modal: Modal;
	  }
	| {
			type: ActionType.UPDATE_MODAL;
			modal: Partial<Modal>;
	  }
	| {
			type: ActionType.DISMISS_MODAL;
			modalId?: string;
	  }
	| {
			type: ActionType.REMOVE_MODAL;
			modalId?: string;
	  }
	| {
			type: ActionType.START_PAUSE;
			time: number;
	  }
	| {
			type: ActionType.END_PAUSE;
			time: number;
	  };

interface State {
	modals: Modal[];
	pausedAt: number | undefined;
}

const toastTimeouts = new Map<Modal["id"], ReturnType<typeof setTimeout>>();

export const TOAST_EXPIRE_DISMISS_DELAY = 1000;

const addToRemoveQueue = (modalId: string) => {
	if (toastTimeouts.has(modalId)) {
		return;
	}

	const timeout = setTimeout(() => {
		toastTimeouts.delete(modalId);
		dispatch({
			type: ActionType.REMOVE_MODAL,
			modalId: modalId,
		});
	}, TOAST_EXPIRE_DISMISS_DELAY);

	toastTimeouts.set(modalId, timeout);
};

const clearFromRemoveQueue = (modalId: string) => {
	const timeout = toastTimeouts.get(modalId);
	if (timeout) {
		clearTimeout(timeout);
	}
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionType.ADD_MODAL:
			return {
				...state,
				modals: [action.modal, ...state.modals].slice(0, MODAL_LIMIT),
			};

		case ActionType.UPDATE_MODAL:
			//  ! Side effects !
			if (action.modal.id) {
				clearFromRemoveQueue(action.modal.id);
			}

			return {
				...state,
				modals: state.modals.map((t) => (t.id === action.modal.id ? { ...t, ...action.modal } : t)),
			};

		case ActionType.UPSERT_MODAL:
			const { modal } = action;
			return state.modals.find((t) => t.id === modal.id)
				? reducer(state, { type: ActionType.UPDATE_MODAL, modal })
				: reducer(state, { type: ActionType.ADD_MODAL, modal });

		case ActionType.DISMISS_MODAL:
			const { modalId } = action;

			// ! Side effects ! - This could be execrated into a dismissToast() action, but I'll keep it here for simplicity
			if (modalId) {
				addToRemoveQueue(modalId);
			} else {
				state.modals.forEach((toast) => {
					addToRemoveQueue(toast.id);
				});
			}

			return {
				...state,
				modals: state.modals.map((t) =>
					t.id === modalId || modalId === undefined
						? {
								...t,
								visible: false,
						  }
						: t
				),
			};
		case ActionType.REMOVE_MODAL:
			if (action.modalId === undefined) {
				return {
					...state,
					modals: [],
				};
			}
			return {
				...state,
				modals: state.modals.filter((t) => t.id !== action.modalId),
			};

		case ActionType.START_PAUSE:
			return {
				...state,
				pausedAt: action.time,
			};

		case ActionType.END_PAUSE:
			const diff = action.time - (state.pausedAt || 0);

			return {
				...state,
				pausedAt: undefined,
				modals: state.modals.map((t) => ({
					...t,
					pauseDuration: t.pauseDuration + diff,
				})),
			};
	}
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { modals: [], pausedAt: undefined };

export const dispatch = (action: Action) => {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => {
		listener(memoryState);
	});
};

export const defaultTimeouts: { [key in ModalType]: number } = {
	blank: 4000,
	error: 4000,
	success: 2000,
	loading: Infinity,
	custom: 4000,
};

export const useStore = (modalOptions: DefaultModalOptions = {}): State => {
	const [state, setState] = useState<State>(memoryState);
	useEffect(() => {
		listeners.push(setState);
		return () => {
			const index = listeners.indexOf(setState);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		};
	}, [state]);

	const mergedModals = state.modals.map((m) => ({
		...modalOptions,
		...modalOptions[m.type],
		...m,
		duration: m.duration || modalOptions[m.type]?.duration || modalOptions?.duration || defaultTimeouts[m.type],
		style: StyleSheet.flatten([modalOptions.style, modalOptions[m.type]?.style, m.style]),
	}));
	console.log(mergedModals);
	return {
		...state,
		modals: mergedModals,
	};
};
