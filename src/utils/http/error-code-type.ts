export const errorCodeType = function (code: number): string {
    let message = '未知错误，请联系管理员处理！';
    switch (code) {
        case 302:
            message = '接口重定向了！';
            break;
        case 400:
            message = '（错误请求）Bad Request请求包含语法错误！';
            break;
        case 401:
            message = '未授权，当前请求需要用户验证！';
            break;
        case 403:
            message = '服务器已理解请求，但拒绝访问，您可能没有权限操作！';
            break;
        case 404:
            message = '请求错误,服务器未找到该资源！';
            break;
        case 405:
            message = '请求方法未允许！';
            break;
        case 408:
            message = '服务器等候请求时发生超时！';
            break;
        case 409:
            message = '系统已存在相同数据！';
            break;
        case 410:
            message = '该资源已被删除！';
            break;
        case 413:
            message = '请求实体过大！';
            break;
        case 414:
            message = '请求的 URI 过长！';
            break;
        case 500:
            message = '服务器端出错！';
            break;
        case 501:
            message = '服务器不具备完成请求的功能！';
            break;
        case 502:
            message = '错误网关！';
            break;
        case 503:
            message = '由于临时的服务器维护或者过载，服务器当前无法处理请求！';
            break;
        case 504:
            message = '网络超时！';
            break;
        case 505:
            message = '服务器不支持请求中所用的 HTTP 协议版本！';
            break;
        default:
            message = `其他错误 -- ${code}`;
    }
    return message;
};
