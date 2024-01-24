function debounce(fn, wait) {
    let timer = null;
    return function() {
        const _this = this;
        const args = arguments;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(_this, args)
        }, wait)
    }
}

function throttle(fn, wait) {
    let isThrottled = null;
    let savedContext = null;
    let savedArgs = null;
    return function wrapper() {
        if (isThrottled) {
            savedContext = this
            savedArgs = arguments;
            return
        }
        isThrottled = true;
        fn.apply(this, arguments)
        setTimeout(() => {
            isThrottled = false;
            if (savedContext) {
                wrapper.apply(savedContext, savedArgs)
                savedContext = null;
                savedArgs = null
            }
        }, wait)
    }
}
