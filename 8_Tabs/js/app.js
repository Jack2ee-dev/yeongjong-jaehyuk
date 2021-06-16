const $tabs = document.querySelector('.tabs')
const $glider = document.querySelector('.glider');
const render = () => {
  const _nav = '<nav>' + tabsInfo().map(({id, title}) => `
    <input type="radio" id=${id} name="tab" ${activeTabId() === id ? "checked": ""}>
    <label class="tab" for=${id}>${title}</label>
  `).join('') + '<span class="glider"></span></nav>';

  const _tabContent = tabsInfo().map(({id, content}) => `
    <div class="tab-content ${activeTabId() === id ? 'active': ''}">${content}</div>
  `).join('');
  
  $tabs.innerHTML = _nav + _tabContent;

  document.querySelector(':root').style.setProperty('--tabs-length', tabsInfo().length);
};

const useState = defaultValue => {
  let value = defaultValue;

  const get = () => value;
  const set = updatedValue => {
    value = updatedValue;
    render();
  };

  return [get, set];
};

const [tabsInfo, setTabsInfo] = useState([]);
const [activeTabId, setActiveTabId] = useState(1);
const fetchTabsData = () =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
          },
          {
            id: 2,
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`
          },
          {
            id: 3,
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          }
        ]),
      1000
    );
  });

window.addEventListener('DOMContentLoaded', () => {
  fetchTabsData()
    .then(result => {
      setTabsInfo(result);
      document.querySelector('.spinner').style.display = 'none';
    })
    .catch(exception => {
      throw new Error(exception);
    });
});


$tabs.addEventListener('click', e => {
  setActiveTabId(+e.target.id);
  $glider.style.left = (+e.target.id * 200) + 'px';
})
