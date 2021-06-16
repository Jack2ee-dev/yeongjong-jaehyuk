const DEFAULT_TAB_ID = 1;

const $root = document.querySelector(':root');
const $tabs = document.querySelector('.tabs');
const $spinner = document.querySelector('.spinner');

const useState = defaultValue => {
  let value = defaultValue;

  const get = () => value;
  const set = updatedValue => {
    value = updatedValue;
  };

  return [get, set];
};

const [tabsInfo, setTabsInfo] = useState([]);

// functions
const render = () => {
  const _nav =
    '<nav>' +
    tabsInfo()
      .map(
        ({ id, title }) => `
    <input type="radio" id=${id} name="tab" ${
          id === DEFAULT_TAB_ID ? 'checked' : ''
        }>
    <label class="tab" for=${id}>${title}</label>
  `
      )
      .join('') +
    '<span class="glider"></span></nav>';

  const _tabContent = tabsInfo()
    .map(
      ({ id, content }) => `
    <div class="tab-content ${
      id === DEFAULT_TAB_ID ? 'active' : ''
    }">${content}</div>
  `
    )
    .join('');

  $tabs.innerHTML = _nav + _tabContent;

  $root.style.setProperty('--tabs-length', tabsInfo().length);
};

const moveGlider = (labelID = DEFAULT_TAB_ID) => {

  document.querySelector('.glider').style.left =
    (labelID - 1) *
      +getComputedStyle($root).getPropertyValue('--tab-width').trim() +
    'px';
};

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

// event listeners
window.addEventListener('DOMContentLoaded', () => {
  fetchTabsData()
    .then(result => {
      setTabsInfo(result);
    })
    .then(() => {
      $spinner.style.display = 'none';

      render();
      moveGlider();
    })
    .catch(exception => {
      throw new Error(exception);
    });
});

$tabs.addEventListener('click', ({target}) => {
  if (!target.matches('.tabs > nav > label')) return;

  const labelID = +target.htmlFor;

  [...document.getElementsByClassName('tab-content')].forEach(
    (_tabContent, i) => {
      _tabContent.classList.toggle('active', i + 1 === labelID);
    }
    );

  moveGlider(labelID);
});
