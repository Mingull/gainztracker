import { ActionType, dispatch } from "./store";
import {
	DefaultModalOptions,
	Modal,
	ModalOptions,
	ModalType,
	Renderable,
	ValueOrFunction,
	resolveValue,
} from "./types";
import { genId } from "./utils";

type Message = ValueOrFunction<Renderable, Modal>;

type ModalHandler = (message: Message, options?: ModalOptions) => string;

const createModal = (message: Message, type: ModalType = "blank", options?: ModalOptions): Modal => ({
	createdAt: Date.now(),
	visible: true,
	type,
	ariaProps: { role: "status", "aria-live": "polite" },
	message,
	pauseDuration: 0,
	...options,
	id: options?.id || genId(),
});

const createHandler =
	(type?: ModalType): ModalHandler =>
	(message, options) => {
		const modal = createModal(message, type, options);
		dispatch({ type: ActionType.UPSERT_MODAL, modal });
		return modal.id;
	};

const modal = (message: Message, options?: ModalOptions) => createHandler("blank")(message, options);

modal.error = createHandler("error");
modal.success = createHandler("success");
modal.loading = createHandler("loading");
modal.custom = createHandler("custom");

modal.dismiss = (modalId?: string) => {
	dispatch({ type: ActionType.DISMISS_MODAL, modalId });
};

modal.remove = (modalId?: string) => dispatch({ type: ActionType.REMOVE_MODAL, modalId });

modal.promise = <T>(
	promise: Promise<T>,
	msgs: {
		loading: Renderable;
		success: ValueOrFunction<Renderable, T>;
		error: ValueOrFunction<Renderable, any>;
	},
	opts?: DefaultModalOptions
) => {
	const id = modal.loading(msgs.loading, { ...opts, ...opts?.loading });

	promise
		.then((p) => {
			modal.success(resolveValue(msgs.success, p), {
				id,
				...opts,
				...opts?.success,
			});
			return p;
		})
		.catch((e) => {
			modal.error(resolveValue(msgs.error, e), {
				id,
				...opts,
				...opts?.error,
			});
		});

	return promise;
};

export { modal };
