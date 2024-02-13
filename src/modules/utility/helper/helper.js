export const getNavigationOptions = (solutionName) => {
    if (solutionName === 'solar-solution') {
        return [
            { label: 'Address', tab: 'address', visible: true, link: ':url/' },
            { label: 'Address Map', tab: 'address', visible: false, hideHeader: true, link: ':url/address-map' },
            { label: 'Utilities', tab: 'utilities', visible: true, link: ':url/utilities' },
            { label: 'Solar Panels', tab: 'solar-panels', visible: true, link: ':url/solar-panels' },
            { label: 'Battery Storage', tab: 'battery-storage', visible: true, link: ':url/battery-storage' },
            { label: 'Contact Info', tab: 'contact-info', visible: true, link: ':url/contact-info' },
            { label: 'Cost Summary', tab: 'cost-summary', visible: true, link: ':url/cost-summary', displaySubmit: true },
            { label: 'Finish', tab: 'finish', visible: false, hideHeader: true, hideActionButtons: true, link: ':url/finish' }
        ]
    }
    else if (solutionName === 'roof-solution') {
        return [
            { label: 'Address', tab: 'address', visible: true, link: ':url/' },
            { label: 'Address Map', tab: 'address', visible: false, hideHeader: true, link: ':url/address-map' },
            { label: 'Roof Select', tab: 'materials', visible: false, link: ':url/roof-select' },
            { label: 'Measurements', tab: 'measurements', visible: true, link: ':url/measurements' },
            { label: 'Contact Info', tab: 'contact-info', visible: true, link: ':url/contact-info' },
            { label: 'Cost Summary', tab: 'cost-summary', visible: true, link: ':url/cost-summary', displaySubmit: true },
            { label: 'Finish', tab: 'finish', visible: false, hideHeader: true, hideActionButtons: true, link: ':url/finish' }
        ]
    }
    else if (solutionName === 'roof-solution:solar-solution') {
        return [
            { label: 'Address', tab: 'address', visible: true, link: ':url/' },
            { label: 'Address Map', tab: 'address', visible: false, hideHeader: true, link: ':url/address-map' },
            { label: 'Roof Select', tab: 'materials', visible: false, link: ':url/roof-select' },
            { label: 'Measurements', tab: 'measurements', visible: true, link: ':url/measurements' },
            { label: 'Utilities', tab: 'utilities', visible: true, link: ':url/utilities' },
            { label: 'Solar Panels', tab: 'solar-panels', visible: true, link: ':url/solar-panels' },
            { label: 'Battery Storage', tab: 'battery-storage', visible: true, link: ':url/battery-storage' },
            { label: 'Contact Info', tab: 'contact-info', visible: true, link: ':url/contact-info' },
            { label: 'Cost Summary', tab: 'cost-summary', visible: true, link: ':url/cost-summary', displaySubmit: true },
            { label: 'Finish', tab: 'finish', visible: false, hideHeader: true, hideActionButtons: true, link: ':url/finish' }
        ]
    }
    else if (solutionName === 'solar-solution:roof-solution') {
        return [
            { label: 'Address', tab: 'address', visible: true, link: ':url/' },
            { label: 'Address Map', tab: 'address', visible: false, hideHeader: true, link: ':url/address-map' },
            { label: 'Utilities', tab: 'utilities', visible: true, link: ':url/utilities' },
            { label: 'Solar Panels', tab: 'solar-panels', visible: true, link: ':url/solar-panels' },
            { label: 'Battery Storage', tab: 'battery-storage', visible: true, link: ':url/battery-storage' },
            { label: 'Roof Select', tab: 'materials', visible: false, link: ':url/roof-select' },
            { label: 'Measurements', tab: 'measurements', visible: true, link: ':url/measurements' },
            { label: 'Contact Info', tab: 'contact-info', visible: true, link: ':url/contact-info' },
            { label: 'Cost Summary', tab: 'cost-summary', visible: true, link: ':url/cost-summary', displaySubmit: true },
            { label: 'Finish', tab: 'finish', visible: false, hideHeader: true, hideActionButtons: true, link: ':url/finish' }
        ]
    }
    else if (solutionName === 'solar-and-roof-solution') {
        return [
            { label: 'Address', tab: 'address', visible: true, link: ':url/' },
            { label: 'Address Map', tab: 'address', visible: false, hideHeader: true, link: ':url/address-map' },
            { label: 'Utilities', tab: 'utilities', visible: true, link: ':url/utilities' },
            { label: 'Solar Panels', tab: 'solar-panels', visible: true, link: ':url/solar-panels' },
            { label: 'Battery Storage', tab: 'battery-storage', visible: true, link: ':url/battery-storage' },
            { label: 'Roof Select', tab: 'materials', visible: false, link: ':url/roof-select' },
            { label: 'Measurements', tab: 'measurements', visible: true, link: ':url/measurements' },
            { label: 'Contact Info', tab: 'contact-info', visible: true, link: ':url/contact-info' },
            { label: 'Cost Summary', tab: 'cost-summary', visible: true, link: ':url/cost-summary', displaySubmit: true },
            { label: 'Finish', tab: 'finish', visible: false, hideHeader: true, hideActionButtons: true, link: ':url/finish' }
        ]
    }
    return [
        { label: 'Address', tab: 'address', visible: true, link: ':url/' },
        { label: '', tab: '', visible: false, link: ':url/' }
    ];
};

export const validate = (thisArg) => {
    const elements = thisArg.template.querySelectorAll('.c-validate');

    let isValidated = true;

    if (elements.length > 0) {
        for (const element of elements) {
            let valid = element.reportValidity();
            if (!valid) {
                isValidated = false
            }
        }
    }
    return isValidated;
}

export const request = (promiseInstance) => {
    return new Promise((resolve, reject) => {
        promiseInstance
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}