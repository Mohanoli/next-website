// Strong Password (8–64, upper, lower, number, special, no spaces)
export const passwordRule =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+.,:;])[A-Za-z\d@$!%*?&^#()[\]{}\-_=+.,:;]{8,64}$/;

// Email
export const emailRule = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

// Username (3–20, letters, numbers)
export const usernameRule =/^[a-zA-Z0-9]{3,20}$/;

// Nepal Mobile Number
// Valid: 98XXXXXXXX, 97XXXXXXXX, 96XXXXXXXX
export const nepalPhoneRule =/^(98|97)\d{8}$/;