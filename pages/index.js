import Layout from '../components/Layout';
import Content from '../components/Content';
import Header from '../components/Header';
import Card from '../components/Card';
import Quote from '../components/Quote';
import {getQuote} from '../lib/quote-api';
const HELP_TEXT ={
    fetch : 'With an external fetch'
};
const Index =({  quotes  })=> (
    <Layout>
        <Content>
            <Header>Kanye Quotes</Header>
            {quotes.map(({id, quote})=> (
                <Card key={id}>
                    <Quote text={quote} helpText={HELP_TEXT[id]}/>
                </Card>
            ))}
        </Content>
    </Layout>
);

Index.getInitialProps = async({req}) =>{
    const getHost = path =>{
        if (!req) return path;

        const {host} = req.headers;

        if(host.startsWith('localhost')){
            return `http://${host}${path}`;
        }
        return `https://${host}${path}`;
    };
    const quotes = [
        {...(await getQuote('https://api.kayne.rest')), id:'fetch'},
        {...(await getQuote(getHost('api/quote'))), id: "api-routes"}
    ];

    return { quotes }
};

export default Index;