import ptBrJson from './pt-br.json';

const i18nRepository = ptBrJson;

type i18nKeys = keyof typeof i18nRepository;

function t(path: i18nKeys) {
    const resolvedText = i18nRepository[path];

    if (resolvedText) return resolvedText;

    return '';
}

export default t;
