import React from "react"

type DeleteRecordModalProps = {
  id: number
  setShow: (flag: boolean) => void
  show: boolean
  recordName: string
  onDelete: (id: number) => void
}
export default function DeleteRecordModal({
  id,
  show,
  setShow,
  recordName,
  onDelete,
}: DeleteRecordModalProps) {
  return (
    <>
      {show ? (
        <>
          <div className="justify-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Borrar Registro</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Estas seguro que desaes eliminar el registro :{" "}
                    <b>{recordName}</b> ? si lo haces no podras recuperarlo y
                    estaras eliminando las dependencias del mismo que pudieran
                    afectar otras tablas.
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="p-2 bg-danger ml-2 flex min-w-[100px] items-center justify-center rounded-md text-white hover:opacity-80"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="p-2 bg-primary ml-2 flex min-w-[100px] items-center justify-center rounded-md text-white hover:opacity-80"
                    type="button"
                    onClick={() => {
                      onDelete(id)
                      setShow(false)
                    }}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
