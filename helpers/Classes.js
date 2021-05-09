import Repository from '../components/Repository/Repository.js';
import User from '../components/User/User.js';
import UserDetail from '../components/UserDetail/UserDetail.js';

const classes = { User, Repository, UserDetail };
/**
 * Dynamic Classes Helper
 * @param name
 * @returns {*}
 */
export function dynamicClass (name) {
    return classes[name];
}