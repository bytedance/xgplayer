export default function getResponseHeaders(xhr) {
    const headerMap = {};
    if (xhr instanceof window.XMLHttpRequest) {
        try {
            const headers = xhr.getAllResponseHeaders();

            const arr = headers.trim().split(/[\r\n]+/);
            arr.forEach(function (line) {
                const parts = line.split(': ');
                const header = parts.shift();
                const value = parts.join(': ');
                headerMap[header] = value;
            });
        } catch (error) {
        }
    }
    return headerMap;
}