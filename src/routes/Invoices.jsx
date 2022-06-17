import { useLocation, NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { getInvoices } from '../data';



export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: 'flex' }}>
      <input
        value={searchParams.get('filter') || ''}
        onChange={(e) => {
          let filter = e.target.value;
          if (filter) setSearchParams({ filter });
          else setSearchParams({});
        }}
      />
      <nav style={{ borderRight: 'solid 1px', padding: '1rem' }}>
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : '',
                };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}


function  QueryNavLink({to, ...props}){
  let location = useLocation();
  return <NavLink to={to + location.search} {...props}/>
}