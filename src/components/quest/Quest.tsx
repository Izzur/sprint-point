
import toast from "react-hot-toast";
import type { Quest } from "../../types";
import { api } from "../../utils/api";

type QuestProps = {
	quest: Quest
}

export function Quest({ quest }: QuestProps) {
	const { id, name, done } = quest

	const trpc = api.useContext();

	const { mutate: doneMutation } = api.quest.toggle.useMutation({
		onMutate: async ({ id, done }) => {

			// Cancel any outgoing refetches so they don't overwrite our optimistic update
			await trpc.quest.all.cancel()

			// Snapshot the previous value
			const previousQuests = trpc.quest.all.getData()

			// Optimistically update to the new value
			trpc.quest.all.setData(undefined, (prev) => {
				if (!prev) return previousQuests
				return prev.map(t => {
					if (t.id === id) {
						return ({
							...t,
							done
						})
					}
					return t
				})
			})

			// Return a context object with the snapshotted value
			return { previousQuests }
		},

		onSuccess: (err, { done }) => {
			if (done) {
				toast.success("Quest completed 🎉")
			}
		},

		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (err, done, context) => {
			toast.error(`An error occured when marking quest as ${done ? "done" : "undone"}`)
			if (!context) return
			trpc.quest.all.setData(undefined, () => context.previousQuests)
		},
		// Always refetch after error or success:
		onSettled: async () => {
			await trpc.quest.all.invalidate()
		},
	});

	const { mutate: deleteMutation } = api.quest.delete.useMutation({
		onMutate: async (deleteId) => {

			// Cancel any outgoing refetches so they don't overwrite our optimistic update
			await trpc.quest.all.cancel()

			// Snapshot the previous value
			const previousQuests = trpc.quest.all.getData()

			// Optimistically update to the new value
			trpc.quest.all.setData(undefined, (prev) => {
				if (!prev) return previousQuests
				return prev.filter(t => t.id !== deleteId)
			})

			// Return a context object with the snapshotted value
			return { previousQuests }
		},
		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (err, newQuest, context) => {
			toast.error(`An error occured when deleting quest`)
			if (!context) return
			trpc.quest.all.setData(undefined, () => context.previousQuests)
		},
		// Always refetch after error or success:
		onSettled: async () => {
			await trpc.quest.all.invalidate()
		},
	});

	return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                {name}
            </td>
            <td>
                <input className="cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" type="checkbox" name="done" id={id} checked={done} onChange={(e) => {
                    doneMutation({ id, done: e.target.checked });
                }} />
            </td>
        </tr>
		// <div
		// 	className="flex gap-2 items-center justify-between"
		// >
		// 	<div className="flex gap-2 items-center">
		// 		<input
		// 			className="cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
		// 			type="checkbox" name="done" id={id} checked={done}
		// 			onChange={(e) => {
		// 				doneMutation({ id, done: e.target.checked });
		// 			}}
		// 		/>
		// 		<label htmlFor={id} className={`cursor-pointer ${done ? "line-through" : ""}`}>
		// 			{name}
		// 		</label>
		// 	</div>
		// 	<button
		// 		className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		// 		onClick={() => {
		// 			deleteMutation(id)
		// 		}}
		// 	>Delete</button>
		// </div>
	)
}
