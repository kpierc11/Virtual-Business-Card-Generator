import type { MouseEventHandler } from "react";

interface Props {
  onDelete: () => Promise<void>;
}

export default function Modal({ onDelete }:Props) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-xl">Delete Current Virtual Card?</h3>
        <p className="py-4">
          Are you sure you want to delete this Virtual Card? This can't be
          undone.
        </p>
        <div className="modal-action w-[100%]">
          <form className="w-[100%]" method="dialog">
            <div className="flex gap-10">
              <button className="btn btn-error mr-auto" onClick={onDelete}>
                Delete
              </button>
              <button className="btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
