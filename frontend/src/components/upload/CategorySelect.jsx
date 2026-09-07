export default function CategorySelect() {
  return (
    <div>

      <label className="block font-semibold mb-3">
        Category
      </label>

      <select className="w-full h-14 rounded-2xl border border-gray-300 px-5">

        <option>Shirt</option>

        <option>Pants</option>

        <option>Shoes</option>

        <option>Jacket</option>

        <option>Accessories</option>

      </select>

    </div>
  );
}