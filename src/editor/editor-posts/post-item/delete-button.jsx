import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/solid';


 export const DeleteButton=({deletePost,id}) =>{
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = (evt) => {
    evt.preventDefault();
    deletePost(id);
  };

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (<>
    <button
    onClick={()=>setIsOpen(true)}
    className=" px-2 mx-1 h-full focus:outline-none font-semibold text-white justify-center border-red-500 bg-red-500  items-center flex space-x-2 rounded-md border-[3px] hover:bg-red-700"
  >
    {" "}
    <TrashIcon className="w-auto h-4 " />
    <h3 className="hidden ml-2 w-max md:inline">Eliminar</h3>
  </button>

  <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
          open={isOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl border border-gray-200 rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                 Eliminar post
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                  Esta accion no eliminara completamente el post, lo podras encontrar en la seccion de archivados. Si deseas mas tarde puede restaurar el post eliminado.
                  </p>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900  border border-transparent rounded-md hover:bg-gray-200 focus:outline-none "
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500" 
                  onClick={(evt) => handleConfirm(evt)}>Confirmar</button>      
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
 </> )
}