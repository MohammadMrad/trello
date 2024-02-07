import React from "react"
import { useSelector } from "react-redux"

const SmallPage = () => {
  const boardNamestate = useSelector((state) => state.boardName)
  const { boardName } = boardNamestate

  const ListsNameState = useSelector((state) => state.listsName)
  const { listsName } = ListsNameState

  const cardsNameState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsNameState
  const valuesOfCardState = Object.values(cardsName)

  return (
    <div>
      <div className="rounded-xl bg-pink-600 h-auto max-w-23.5rem sm:max-w-full">
        <header className="flex items-center border-b border-solid border-rose-400">
          <nav className="flex items-center justify-between w-full">
            <ul className="flex items-center mx-2">
              <li className="">
                <i className="fa fa-trello text-2xl text-rose-100"></i>
              </li>
              <li className="py-2 px-5 bg-rose-300 m-2 rounded-3xl"></li>
              <li className="py-2 px-5 bg-rose-300 m-2 rounded-3xl"></li>
              <li className="py-2 px-5 bg-rose-300 m-2 rounded-3xl"></li>
            </ul>
            <ul className="flex items-center mx-2">
              <li className="p-3 bg-rose-300 m-2 rounded-full"></li>
              <li className="p-3 bg-rose-300 m-2 rounded-full"></li>
              <li className="">
                <i className="fa fa-bell text-rose-100 mx-2"></i>
              </li>
              <span className="p-3 bg-yellow-400 m-2 rounded-full"></span>
            </ul>
          </nav>
        </header>
        <div className="flex flex-col">
          <div className="flex items-center justify-between w-full py-2">
            <ul className="flex items-center px-4">
              <li className="text-white">
                {boardName.length === 0 ? "board-name" : boardName[0].boardName}
              </li>
            </ul>
            <ul className="flex items-center px-4">
              <li className="bg-rose-300 m-2 p-2 rounded-full"></li>
              <li className="bg-rose-300 m-2 p-2 rounded-full"></li>
              <li className="bg-rose-300 m-2 p-2 rounded-full"></li>
              <li className="bg-blue-600 m-2 p-2 w-12 rounded-full"></li>
            </ul>
          </div>
          <div className="flex">
            <div className="flex flex-col relative w-32 h-48 bg-white m-2 rounded sm:h-60">
              <h2 className=" font-bold text-sm mt-2 ml-2">
                {listsName.length === 0 ? "list-name" : listsName[0].list}
              </h2>
              <h3 className="text-xs font-['Shabnam-Thin'] font-bold ml-4 absolute top-8">
                {cardsName.length === 0
                  ? "card-name"
                  : valuesOfCardState[0].card.card}
              </h3>
              <div className="w-10/12 sm:h-14 h-10 self-center rounded bg-orange-400 absolute bottom-12"></div>
              <h3 className="text-xs font-['Shabnam-Thin'] font-bold ml-4 absolute bottom-4">
                {cardsName.length === 0
                  ? "card-name"
                  : valuesOfCardState[1].card.card}
              </h3>
            </div>
            <div className="flex flex-col relative w-32 h-48 bg-white m-2 rounded sm:h-60">
              <h2 className=" font-bold text-sm mt-2 ml-2">
                {listsName.length === 0 ? "list-name" : listsName[1].list}
              </h2>
              <div className="w-10/12 sm:h-14 h-10 self-center rounded bg-emerald-500 absolute top-12"></div>
            </div>
            <div className="flex flex-col relative w-32 h-48 bg-white m-2 rounded sm:h-60">
              <h2 className="font-bold text-sm mt-2 ml-2">
                {listsName.length === 0 ? "list-name" : listsName[2].list}
              </h2>
              <div className="w-10/12 sm:h-14 h-10 self-center rounded bg-violet-900 absolute top-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallPage
