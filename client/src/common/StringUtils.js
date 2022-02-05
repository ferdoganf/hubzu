var StringUtils = {
	validateEmail: function (email) {
		// First check if any value was actually set
		if (email.length === 0) return false;
		// Now validate the email format using Regex
		// eslint-disable-next-line
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
		return re.test(email);
	}
};
export { StringUtils as default };
