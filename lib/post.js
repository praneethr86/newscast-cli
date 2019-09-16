'use strict';
const Q = require('q');

const hosts = require('./consts');
const editorials = require('./newssrc/editorials');
const magazines = require('./newssrc/magazines');
const sports = require('./newssrc/sports');
const science = require('./newssrc/science');
const tech = require('./newssrc/tech');

function getContent(modifier, value, cb) {
  if (modifier === 'eds') {
    if (value === 'hindu') {
      editorials.edsHindu(hosts.EDITORIAL_HINDU_HOST, cb);
    } else if (value === 'hindulead') {
      editorials.edsHinduLead(hosts.EDITORIAL_HINDU_LEAD_HOST, cb);
    } else if (value === 'et') {
      editorials.edsET(hosts.EDITORIAL_ET_HOST, cb);
    } else if (value === 'ie') {
      editorials.edsIE(hosts.EDITORIAL_IE_HOST, cb);
    } else if (value === 'iecolumns') {
      editorials.edsIE(hosts.EDITORIAL_IE_COLUMNS_HOST, cb);
    } else if (value === 'hbl') {
      editorials.edsHBL(hosts.EDITORIAL_HBL_HOST, cb);
    } else if (value === 'guardian') {
      editorials.edsGuardian(hosts.EDITORIAL_GUARDIAN_HOST, cb);
    } else if (value === 'livemint') {
      editorials.edsLivemint(hosts.EDITORIAL_LIVEMINT_HOST, cb);
    }
  } else if (modifier === 'magz') {
    if (value === 'economist') {
      magazines.magzEconomist(hosts.ECONOMIST_LATEST_HOST, cb);
    } else if (value === 'projsyn') {
      magazines.magzProjSyndicate(hosts.PROJECT_SYNDICATE_HOST, cb);
    } else if (value === 'hbr') {
      magazines.magzHBR(hosts.HBR_LATEST_HOST, cb);
    } else if (value === 'atlantic') {
      magazines.magzAtlantic(hosts.ATLANTIC_LATEST_HOST, cb);
    } else if (value === 'newyorker') {
      magazines.magzNewYorker(hosts.NEWYORKER_LATEST_HOST, cb);
    } else if (value === 'frontline') {
      magazines.magzFrontline(hosts.FRONTLINE_LATEST_HOST, cb);
    }
  } else if (modifier === 'sports') {
    if (value === 'espnf1') {
      sports.sportsESPNF1(hosts.SPORTS_F1_ESPN_HOST, cb);
    } else if (value === 'autof1') {
      sports.sportsAutoSportF1(hosts.SPORTS_F1_AUTOSPORT_HOST, cb);
    } else if (value === 'epl') {
      sports.sportsEPL(hosts.SPORTS_EPL_HOST, cb);
    }
  } else if (modifier === 'science') {
    if (value === 'sciam') {
      science.sciSciAmerican(hosts.SCIENCE_SCIAMERICAN_HOST, cb);
    } else if (value === 'popsci') {
      science.sciPopScience(hosts.SCIENCE_POPSCI_HOST, cb);
    }
  } else if (modifier === 'tech') {
    if (value === 'techcrunch') {
      tech.techTechCrunch(hosts.TECH_TECHCRUNCH_HOST, cb);
    } else if (value === 'tnw') {
      tech.techTNW(hosts.TECH_TNW_HOST, cb);
    }
  }
}

function getStories(modifier, options) {
  const deferred = Q.defer();
  const value = options.value;

  getContent(modifier, value, function(articles) {
    if (!articles) {
      return deferred.reject();
    }

    deferred.resolve(articles);
  });
  return deferred.promise;
}

module.exports = {
  getStories: getStories
};
