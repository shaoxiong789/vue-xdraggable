import install from './install';

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install;