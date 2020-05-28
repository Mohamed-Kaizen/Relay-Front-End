export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function get_random_string(custom_sting) {
	return custom_sting.charAt(Math.floor(Math.random() * custom_sting.length))
}

export function generate_password(
	password_length,
	custom_sting = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&\\'()*+,-./:;<=>?@[\\\\]^_`{|}~"
) {
	/**
	 * Create n-long array and map it to random chars from given alphabet.
	 * Then join individual chars as string
	 */
	return Array.from({length: password_length})
		.map(() => {
			return get_random_string(custom_sting)
		})
		.join("")
}

export function match_path(str, route) {
	const regex = /^\/([^?\/]+)/

	const matched = str.match(regex)

	if (matched === null) {
		return route === "/"
	} else {
		return route.search(matched[0]) === 0
	}
}

export function get_path(str) {
	const regex = /^\/([^?\/]+)/
	const matched = str.match(regex)
	if (matched !== null) {
		return matched[1]
	}
}
