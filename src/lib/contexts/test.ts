/**
 * @DCI-context
 */
export function Test() {
	const FirstRole = { name: 'Test' };

	function FirstRole_method() {
		return FirstRole.name;
	}

	console.log(FirstRole.name); // Accessing Role contract outside its own RoleMethods.
	return FirstRole_method();
}
