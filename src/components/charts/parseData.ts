const parseData = (array: any[]): {time: string[], list: any[]} => {
	const list: any[] = []
	let time: string[] = []

	if (!array.length) return {list, time}
	const chartItemsAmount = array[0].data.data.prices.length
	for (let i = 0; i < chartItemsAmount; i++) {
		
		const itemDate = getDateToChart(array[0].data.data.prices[i][0])
		time.push(itemDate)
		
		const chartItem: any = {}

		array.map(item => {
			chartItem["date"] = getDateToChart(item.data.data.prices[i][0])
			chartItem[item.name] = item.data.data.prices[i][1]
		})

		list.push(chartItem)
	}
		
	return { list, time}
}
export default parseData

function getDateToChart (info: any) {
	const date = new Date(info)
	const hour = date.getHours()
	const minute = date.getMinutes()
	const itemDate = `${hour}:${minute < 10 ? `0${minute}` : minute}`
	return itemDate
}