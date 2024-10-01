import { motion } from "framer-motion";
import BackButton from "../../components/back-button";
import TableHead from "../../components/table-head";

function PageLinks({ link, pageLinks, closeLinksModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-white flex flex-col border-l border-solid border-gray-200 padding p-6 fixed top-8 h-[calc(100vh-32px)] right-0 w-full max-w-screen-md z-20"
    >
      <h2 className="mb-4 text-base font-bold flex items-center gap-2">
        <BackButton onClick={closeLinksModal} />
        <span>Links presents in: {link}</span>
      </h2>
      <div className="flex-grow overflow-y-auto">
        <table className="rounded w-full border-spacing-0 border-separate text-left relative">
          <TableHead headings={["S/L", "Href", "Anchor", "Type"]} top="0" />
          <tbody>
            {pageLinks.map((link, index) => (
              <tr key={index}>
                <td className="px-4 py-3 border border-solid border-t-0 border-gray-300 font-bold">
                  {index + 1}
                </td>
                <td className="px-4 py-3 border border-l-0 border-t-0 border-solid border-gray-300">
                  {link.href}
                </td>
                <td className="px-4 py-3 border border-l-0 border-t-0  border-solid border-gray-300">
                  {link.anchor}
                </td>
                <td className="px-4 py-3 border border-l-0 border-t-0  border-solid border-gray-300">
                  {link.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default PageLinks;
