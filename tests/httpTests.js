import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { deleteOne } from '../models/user';

chai.use(chaiHttp);
chai.should();

describe('Http Index', () => {

    describe('GET HOME PAGE', () => {
        describe('GET / ', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /{anything} no 404', () => {
            it('Typo in URL must redirect to home page', () => {
                return chai.request(app)
                    .get('/nothing')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            });
        });
    });

    describe('App Controller', () => {
        describe('GET /apps/system/accept', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/system/accept')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/count_accepted/system', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/count_accepted/system')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/system/remove', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/system/remove')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/count_remove/system', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/count_remove/system')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
        });

        describe('GET /apps/review/accept', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/review/accept')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/review/remove', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/review/remove')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/apps_accepted', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/apps_accepted')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/count_accepted/ios', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/count_accepted/ios')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/count_accepted/android', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/count_accepted/android')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/apps_removed', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/apps_removed')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/count_removed/ios', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/count_removed/ios')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /apps/count_removed/android', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/apps/count_removed/android')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

    });

    describe('Form Controller', () => {
        describe('GET /patient/forms', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/patient/forms')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });
    });

    describe('User Controller', () => {
        describe('GET /allUsers', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/allUsers')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /:user_email', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/carrascosergio@uniovi.es')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /:user_email/reviewed', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/carrascosergio@uniovi.es/reviewed')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });
    });

    describe('Goole Scraper', () => {
        describe('GET /api/apps/google/raw', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/api/apps/google/raw')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /api/apps/google/descriptionApps', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/api/apps/google/descriptionApps')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /api/apps/google/keywords/:keywords', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/api/apps/google/keywords/exercise')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });
    });

    describe('Apple Scraper', () => {
        describe('GET /api/apps/apple/raw', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/api/apps/apple/raw')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /api/apps/apple/descriptionApps', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/api/apps/apple/descriptionApps')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /api/apps/apple/keywords/:keywords', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/api/apps/apple/keywords/exercise')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });

        describe('GET /api/apps/bothStores', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/api/apps/bothStores')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
                })
            });
        });

        // RStudio
        /*describe('GET /api/apps/listApps', () => {
            it('Must return status 200', () => {
                return chai.request(app)
                    .get('/api/apps/listApps')
                    .then((res) => {
                        res.should.have.status(200);
                    }, (err) => {
                        Promise.reject();
                    })
            })
        });*/
    });
});

/*describe("Http Index", () => { // need to pass auth token
    describe("User controller", () => {
        before("New user creation", (done) => {
            chai.request(app)
                .post('/newUser')
                .send({name: 'TheName', email: 'thename@gmail.com', password: 'password1234' })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

        it('User Log In', (done) => {
            chai.request(app)
                .post('/login')
                .send({email: 'thename@gmail.com', password: "password1234"})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

        it('Must delete a user', (done) => {
            chai.request(app)
                .delete('/delete/thename@gmail.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })
})*/
