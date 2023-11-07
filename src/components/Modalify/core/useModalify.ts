import { useCallback, useEffect } from "react";
import { ActionType, dispatch, useStore } from "./store";
import { DefaultModalOptions, Modal, ModalPosition } from "./types";
import { modal } from "./modal";

const updateHeight = (modalId: string, height: number) => {
	dispatch({
		type: ActionType.UPDATE_MODAL,
		modal: { id: modalId, height },
	});
};
const startPause = () => {
	dispatch({
		type: ActionType.START_PAUSE,
		time: Date.now(),
	});
};

export const useModalify = (modalOptions?: DefaultModalOptions) => {
	const { modals, pausedAt } = useStore(modalOptions);

	useEffect(() => {
		if (pausedAt) {
			return;
		}

		const now = Date.now();
		const timeouts = modals.map((m) => {
			if (m.duration === Infinity) {
				return;
			}

			const durationLeft = (m.duration || 0) + m.pauseDuration - (now - m.createdAt);

			if (durationLeft < 0) {
				if (m.visible) {
					modal.dismiss(m.id);
				}
				return;
			}
			return setTimeout(() => modal.dismiss(m.id), durationLeft);
		});

		return () => {
			timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
		};
	}, [modals, pausedAt]);

	const endPause = useCallback(() => {
		if (pausedAt) {
			dispatch({ type: ActionType.END_PAUSE, time: Date.now() });
		}
	}, [pausedAt]);

	const calculateOffset = useCallback(
		(
			modal: Modal,
			opts?: {
				reverseOrder?: boolean;
				gutter?: number;
				defaultPosition?: ModalPosition;
			}
		) => {
			const { reverseOrder = false, gutter = 8, defaultPosition } = opts || {};

			const relevantToasts = modals.filter(
				(m) => (m.position || defaultPosition) === (modal.position || defaultPosition) && m.height
			);
			const toastIndex = relevantToasts.findIndex((t) => t.id === modal.id);
			const toastsBefore = relevantToasts.filter((modal, i) => i < toastIndex && modal.visible).length;

			const offset = relevantToasts
				.filter((t) => t.visible)
				.slice(...(reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]))
				.reduce((acc, t) => acc + (t.height || 0) + gutter, 0);

			return offset;
		},
		[modals]
	);

	return {
		modals,
		handlers: {
			updateHeight,
			startPause,
			endPause,
			calculateOffset,
		},
	};
};
// Modalify
