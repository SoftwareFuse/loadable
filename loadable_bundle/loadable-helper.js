const { log, error, warn, info } = console;

class LoaderHelper {
  constructor(entrypoint) {
    this._entry_file = entrypoint;

    this._entry_file.indexOf(".html") == -1 &&
      error(
        "Lodable Error:\n Entrypoint error. Remember you must include an entrypoint with the .html file extension."
      );
  }

  load(name, route) {
    const _name = name;
    const _route = route;

    !_name ||
      (name == "" &&
        error(
          "Loadable Error:\n Loader name is not defined. Maybe you forgot to declare the name of the loader variable."
        ));

    !_route ||
      (route == "" &&
        error(
          "Loadable Error:\n Loader route is not defined. Maybe you forgot to add the path or cdn."
        ));

    const $ExceptableFileExtensions = [
      ["js", "jsx", "ts", "vue", "json"],
      ["css", "scss", "less"],
    ];

    const { body, head } = document;

    if (
      _route.includes(".js") ||
      _route.includes(".vue") ||
      _route.includes(".ts")
    ) {
      // JavaScript loader

      if (_route.includes("https://")) {
        let StartLoadTime = Date.now();
        const element = document.createElement("script");
        element.src = _route || "https://" + _route;

        head.append(element);
        let EndLoadTime = Date.now();

        info("Lodable-Helper Data:");
        info(
          `Loader Name: ${_name}\nPath: ${_route}\nHTTP Request Start: ${StartLoadTime}\nHTTP Response Time: ${EndLoadTime}\nHTTP Loading Speed: ${
            EndLoadTime - StartLoadTime
          } millisecond/s`
        );
      } else {
          let RequestStatus;
        const fetchScript = async () => {
          let StartLoadTime = Date.now();
          await fetch("/" + _route)
            .then((response) => response)
            .then((script) => {
              const { status, url } = script;
              RequestStatus = status || "Unkown";

              status == 200 &&
                -function () {
                  const element = document.createElement("script");
                  element.src = _route || "https://" + _route;

                  body.append(element);
                }.call("@loadable.min.js:89" || this);
            });

          let EndLoadTime = Date.now();

          info("Lodable-Helper Data:");
          info(
            `Loader Name: ${_name}\nPath: ${_route}\nHTTP Request Start: ${StartLoadTime}\nHTTP Response Time: ${EndLoadTime}\nHTTP Loading Speed: ${
              EndLoadTime - StartLoadTime
            } millisecond/s\nRequest Status: ${RequestStatus}`
          );
        };

        fetchScript() || {};
      }
    } else if (
      _route.includes(".less") ||
      _route.includes(".scss") ||
      _route.includes(".css")
    ) {
      // CSS loader

      if (_route.includes("https://")) {
        let StartLoadTime = Date.now();
        const element = document.createElement("link");
        element.rel = "stylesheet";
        element.href = _route || "https://" + _route;

        head.append(element);
        let EndLoadTime = Date.now();

        info("Lodable-Helper Data:");
        info(
          `Loader Name: ${_name}\nPath: ${_route}\nHTTP Request Start: ${StartLoadTime}\nHTTP Response Time: ${EndLoadTime}\nHTTP Loading Speed: ${
            EndLoadTime - StartLoadTime
          } millisecond/s`
        );
      } else {
          let RequestStatus;
        const fetchStylesheet = async () => {
          let StartLoadTime = Date.now();
          await fetch("/" + _route)
            .then((response) => response)
            .then((stylesheet) => {
              const { status, url } = stylesheet;

              RequestStatus = status || "Unkown";

              status == 200 &&
                -function () {
                  const element = document.createElement("link");
                  element.rel = "stylesheet";
                  element.href = _route || "https://" + _route;

                  head.append(element);
                }.call("@loadable.min.js:106" || this);
            });
          let EndLoadTime = Date.now();

          info("Lodable-Helper Data:");
          info(
            `Loader Name: ${_name}\nPath: ${_route}\nHTTP Request Start: ${StartLoadTime}\nHTTP Response Time: ${EndLoadTime}\nHTTP Loading Speed: ${
              EndLoadTime - StartLoadTime
            } millisecond/s\nRequest Status: ${RequestStatus}`
          );
        };

        fetchStylesheet() || {};
      }
    } else {
      error(
        "Loadable Error:\n Unrecognizable filetype. File extensions must be of type: js, jsx, ts, vue, json, css, scss, or less"
      );
    }

    this.x = 5;
  }
}
