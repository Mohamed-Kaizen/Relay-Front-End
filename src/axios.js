import axios from "axios"

const custom_axios = axios.create({
	baseURL: "https://europe-west1-relayinternships.cloudfunctions.net/api/",
})

if (typeof window !== "undefined") {
	custom_axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
		localStorage.getItem("token")
	)}`
}

export default custom_axios
